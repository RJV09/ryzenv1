-- Allow anonymous review submissions by relaxing the INSERT policy
-- 1) Drop the old policy that only allowed auth users to insert their own reviews
DROP POLICY IF EXISTS "Users can create their own reviews" ON public.reviews;

-- 2) Create a new policy that allows anyone (anon or auth) to insert reviews
--    If authenticated, they can set user_id = auth.uid(); if not, user_id can be NULL
CREATE POLICY "Anyone can create reviews"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Keep existing SELECT and UPDATE policies intact
-- No schema changes required