-- Create table for bot statistics
CREATE TABLE public.bot_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_name TEXT NOT NULL UNIQUE,
  stat_value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bot_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read bot stats (public data)
CREATE POLICY "Bot stats are publicly readable" 
ON public.bot_stats 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to update stats (for bot updates)
CREATE POLICY "Authenticated users can update bot stats" 
ON public.bot_stats 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bot_stats_updated_at
BEFORE UPDATE ON public.bot_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial bot statistics
INSERT INTO public.bot_stats (stat_name, stat_value) VALUES
('servers', 1250),
('users', 50000),
('uptime', 99);

-- Enable realtime for live updates
ALTER TABLE public.bot_stats REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bot_stats;