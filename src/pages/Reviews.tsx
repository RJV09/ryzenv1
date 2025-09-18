import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ReviewForm from "@/components/ReviewForm";

interface Review {
  id: string;
  name: string;
  discord_username: string | null;
  server_name: string | null;
  review_text: string;
  rating: number;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover"
            >
              {showForm ? "View Reviews" : "Write a Review"}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-morph-gradient"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-2xl animate-morph-gradient"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {showForm ? (
            <section ref={sectionRef}>
              <div className={`text-center mb-12 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 text-gradient">
                  Share Your Experience
                </h1>
                <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
                  Help other Discord server owners discover the power of Ryzen V1
                </p>
              </div>
              <div className={`${sectionVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <ReviewForm />
              </div>
            </section>
          ) : (
            <section ref={sectionRef}>
              <div className={`text-center mb-16 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 text-gradient">
                  Community Reviews
                </h1>
                <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
                  Real experiences from Discord server owners who trust Ryzen V1
                </p>
                {reviews.length > 0 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-accent fill-current" />
                      ))}
                    </div>
                    <span className="text-text-muted ml-2">
                      Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="text-2xl font-semibold mb-4">Be the First to Review!</h3>
                  <p className="text-text-muted mb-8 max-w-md mx-auto">
                    Share your experience with Ryzen V1 and help other server owners discover our bot.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover"
                  >
                    Write the First Review
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.map((review, index) => (
                    <Card
                      key={review.id}
                      className={`bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-2 cursor-pointer overflow-hidden ${sectionVisible ? 'animate-bounce-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <Quote className="w-10 h-10 text-primary" />
                      </div>

                      <CardContent className="p-6">
                        {/* Rating stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-accent fill-current animate-breathe"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>

                        {/* Review content */}
                        <p className="text-text-muted leading-relaxed text-sm sm:text-base font-inter mb-6 group-hover:text-foreground transition-colors duration-300">
                          "{review.review_text}"
                        </p>

                        {/* Author info */}
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                            {review.name}
                          </div>
                          {review.discord_username && (
                            <div className="text-sm text-text-muted mb-1">
                              Discord: {review.discord_username}
                            </div>
                          )}
                          {review.server_name && (
                            <div className="text-sm text-text-muted mb-2">
                              Server: {review.server_name}
                            </div>
                          )}
                          <div className="text-xs text-text-muted">
                            {formatDate(review.created_at)}
                          </div>
                        </div>
                      </CardContent>

                      {/* Shimmer effect */}
                      <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reviews;