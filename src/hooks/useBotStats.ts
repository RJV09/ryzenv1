import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BotStat {
  id: string;
  stat_name: string;
  stat_value: number;
  updated_at: string;
}

interface BotStats {
  servers: number;
  users: number;
  uptime: number;
}

export const useBotStats = () => {
  const [stats, setStats] = useState<BotStats>({
    servers: 0,
    users: 0,
    uptime: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('bot_stats')
          .select('*');

        if (error) {
          console.error('Error fetching bot stats:', error);
          return;
        }

        if (data) {
          const statsMap: BotStats = {
            servers: 0,
            users: 0,
            uptime: 0,
          };

          data.forEach((stat: BotStat) => {
            if (stat.stat_name in statsMap) {
              statsMap[stat.stat_name as keyof BotStats] = stat.stat_value;
            }
          });

          setStats(statsMap);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Set up real-time subscription
    const channel = supabase
      .channel('bot-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bot_stats',
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object') {
            const newStat = payload.new as BotStat;
            setStats(prev => ({
              ...prev,
              [newStat.stat_name]: newStat.stat_value,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading };
};