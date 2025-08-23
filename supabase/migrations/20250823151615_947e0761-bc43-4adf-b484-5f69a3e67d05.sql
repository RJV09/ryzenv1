-- Update bot statistics with real values
UPDATE public.bot_stats 
SET stat_value = 69, updated_at = now() 
WHERE stat_name = 'servers';

UPDATE public.bot_stats 
SET stat_value = 6969, updated_at = now() 
WHERE stat_name = 'users';

UPDATE public.bot_stats 
SET stat_value = 100, updated_at = now() 
WHERE stat_name = 'uptime';