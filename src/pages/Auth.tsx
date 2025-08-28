import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password validation
  const validatePassword = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(validatePassword(password));
  }, [password]);

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow"></div>
        </div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordStrength < 3) {
      toast({
        title: "Weak Password",
        description: "Password must be stronger. Include uppercase, lowercase, numbers, and special characters.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    const { error } = await signUp(email, password);
    
    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setActiveTab('signin');
    }
    setIsLoading(false);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-destructive';
    if (passwordStrength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-hero-mesh opacity-30"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-primary/40 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-secondary/40 rounded-full animate-float delay-1000"></div>
      <div className="absolute bottom-32 left-32 w-4 h-4 bg-accent/30 rounded-full animate-float delay-2000"></div>
      
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
            </div>
            <h1 className="text-4xl font-bold text-gradient glow">
              Ryzen V1
            </h1>
            <Zap className="w-8 h-8 text-accent animate-bounce" />
          </div>
          <p className="text-muted-foreground">Enter the next generation</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass border-primary/20">
            <TabsTrigger value="signin" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="animate-slide-up">
            <Card className="glass border-primary/20 shadow-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary glow">Welcome Back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Access your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-foreground font-medium">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass border-primary/30 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-foreground font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="glass border-primary/30 focus:border-primary focus:ring-primary/50 transition-all duration-300 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button hover:shadow-button-hover transition-all duration-300 group" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                        Signing In...
                      </div>
                    ) : (
                      <span className="group-hover:glow transition-all duration-300">Access Dashboard</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="animate-slide-up">
            <Card className="glass border-primary/20 shadow-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary glow">Join Ryzen V1</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create your account and unlock the power
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-foreground font-medium">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass border-primary/30 focus:border-primary focus:ring-primary/50 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-foreground font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="glass border-primary/30 focus:border-primary focus:ring-primary/50 transition-all duration-300 pr-10"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Strength:</span>
                          <span className={`font-medium ${passwordStrength < 2 ? 'text-destructive' : passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                i < passwordStrength ? getPasswordStrengthColor() : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-foreground font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="glass border-primary/30 focus:border-primary focus:ring-primary/50 transition-all duration-300 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword && (
                      <div className="flex items-center gap-2 text-sm">
                        {password === confirmPassword ? (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="h-3 w-3" />
                            <span>Passwords match</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            <span>Passwords don't match</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button hover:shadow-button-hover transition-all duration-300 group" 
                    disabled={isLoading || passwordStrength < 3 || password !== confirmPassword}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <span className="group-hover:glow transition-all duration-300">Create Account</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;