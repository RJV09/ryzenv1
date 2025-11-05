import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { reviewSchema, type ReviewFormData } from "@/lib/validation";

const ReviewForm = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [serverName, setServerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    // Validate form data
    try {
      const formData: ReviewFormData = {
        name: name.trim(),
        discord_username: discordUsername.trim() || null,
        server_name: serverName.trim() || null,
        review_text: reviewText.trim(),
        rating
      };

      const validatedData = reviewSchema.parse(formData);

      setIsSubmitting(true);

      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          name: validatedData.name,
          discord_username: validatedData.discord_username,
          server_name: validatedData.server_name,
          review_text: validatedData.review_text,
          rating: validatedData.rating
        });

      if (error) throw error;

      toast.success("Review submitted successfully! It will be reviewed before being published.");
      
      // Reset form
      setRating(0);
      setName("");
      setDiscordUsername("");
      setServerName("");
      setReviewText("");
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        error.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        console.error('Error submitting review:', error);
        toast.error("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card-gradient border-glass-border glass shadow-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-space text-gradient text-center">
          Share Your Experience
        </CardTitle>
        <p className="text-text-muted text-center">
          {user ? "Help others discover Ryzen V1 by sharing your experience" : "Please sign in to submit a review"}
        </p>
      </CardHeader>
      <CardContent>
        {!user ? (
          <div className="text-center py-8">
            <p className="text-text-muted mb-4">You need to be signed in to write a review.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover"
            >
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rating <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-transform hover:scale-110"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "text-accent fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-background/50 border-glass-border"
                maxLength={100}
                required
              />
            </div>

            {/* Discord Username */}
            <div>
              <label htmlFor="discord" className="block text-sm font-medium mb-2">
                Discord Username
              </label>
              <Input
                id="discord"
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                placeholder="YourDiscordName#1234"
                className="bg-background/50 border-glass-border"
                maxLength={100}
              />
            </div>

            {/* Server Name */}
            <div>
              <label htmlFor="server" className="block text-sm font-medium mb-2">
                Server Name
              </label>
              <Input
                id="server"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Your Discord Server"
                className="bg-background/50 border-glass-border"
                maxLength={200}
              />
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium mb-2">
                Your Review <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your experience with Ryzen V1... (min 10 characters)"
                className="bg-background/50 border-glass-border min-h-32"
                maxLength={1000}
                required
              />
              <p className="text-xs text-text-muted mt-1">
                {reviewText.length}/1000 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !rating || !name.trim() || reviewText.trim().length < 10}
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover transition-all duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewForm;