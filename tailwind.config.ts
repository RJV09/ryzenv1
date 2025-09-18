import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
		screens: {
			'xs': '475px',
			'2xl': '1400px'
		}
		},
			extend: {
				fontFamily: {
					'inter': ['Inter', 'sans-serif'],
					'space': ['Space Grotesk', 'sans-serif'],
					'sans': ['Inter', 'sans-serif'],
				},
				colors: {
					border: 'hsl(var(--border))',
					input: 'hsl(var(--input))',
					ring: 'hsl(var(--ring))',
					background: 'hsl(var(--background))',
					foreground: 'hsl(var(--foreground))',
					primary: {
						DEFAULT: 'hsl(var(--primary))',
						foreground: 'hsl(var(--primary-foreground))',
						glow: 'hsl(var(--primary-glow))',
						dark: 'hsl(var(--primary-dark))'
					},
					secondary: {
						DEFAULT: 'hsl(var(--secondary))',
						foreground: 'hsl(var(--secondary-foreground))'
					},
					'hero-bg': 'hsl(var(--hero-bg))',
					'feature-card': 'hsl(var(--feature-card))',
					'text-purple': 'hsl(var(--text-purple))',
					'text-muted': 'hsl(var(--text-muted))',
					'glass-bg': 'hsl(var(--glass-bg))',
					'glass-border': 'hsl(var(--glass-border))',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%': { textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' },
					'100%': { textShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))' }
				},
				'fadeIn': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slideUp': {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'bounceIn': {
					'0%': { opacity: '0', transform: 'scale(0.3) translateY(50px)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05) translateY(-10px)' },
					'100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
				},
				'scaleIn': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'particleFloat': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(120deg)' },
					'66%': { transform: 'translateY(10px) rotate(240deg)' }
				},
				'morphGradient': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.6' },
					'50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'slideInLeft': {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slideInRight': {
					'0%': { opacity: '0', transform: 'translateX(50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'zoomIn': {
					'0%': { opacity: '0', transform: 'scale(0.5)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.6s ease-out forwards',
				'bounce-in': 'bounceIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'scale-in': 'scaleIn 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'breathe': 'breathe 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'slide-in-left': 'slideInLeft 0.6s ease-out',
				'slide-in-right': 'slideInRight 0.6s ease-out',
				'zoom-in': 'zoomIn 0.5s ease-out',
				'particle-float': 'particleFloat 6s ease-in-out infinite',
				'morph-gradient': 'morphGradient 8s ease-in-out infinite'
			},
			backgroundImage: {
				'hero-gradient': 'var(--hero-gradient)',
				'hero-mesh': 'var(--hero-mesh)',
				'hero-overlay': 'var(--hero-overlay)',
				'card-gradient': 'var(--card-gradient)',
				'card-gradient-hover': 'var(--card-gradient-hover)',
				'premium-gradient': 'var(--premium-gradient)',
				'glass-gradient': 'var(--glass-gradient)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'card-hover': 'var(--shadow-card-hover)',
				'button': 'var(--shadow-button)',
				'button-hover': 'var(--shadow-button-hover)',
				'feature': 'var(--shadow-feature)',
				'premium': '0 20px 60px hsl(262 83% 58% / 0.3), 0 8px 32px hsl(217 91% 60% / 0.2)'
			},
			screens: {
				'xs': '475px',
				'3xl': '1920px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
