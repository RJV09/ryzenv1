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
    servers: 169,
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
            const name = stat.stat_name;
            if (name === 'servers' || name === 'total_servers') {
              statsMap.servers = stat.stat_value;
            } else if (name === 'users' || name === 'total_users') {
              statsMap.users = stat.stat_value;
            } else if (name === 'uptime') {
              statsMap.uptime = stat.stat_value;
            }
          });

          // Fallback: ensure servers shows 169 if not provided by backend
          if (!statsMap.servers) {
            statsMap.servers = 169;
          }

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
            const name = newStat.stat_name;
            setStats(prev => {
              const next = { ...prev };
              if (name === 'servers' || name === 'total_servers') next.servers = newStat.stat_value;
              else if (name === 'users' || name === 'total_users') next.users = newStat.stat_value;
              else if (name === 'uptime') next.uptime = newStat.stat_value;
              return next;
            });
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