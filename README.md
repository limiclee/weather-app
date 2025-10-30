# 🌤️ Weather App

A modern, responsive weather application built with Next.js, TypeScript, and the OpenWeatherMap API.

## ✨ Features

- **Real-time Weather Data** - Get current weather for any city worldwide
- **Smart Search** - Autocomplete city search with suggestions
- **Beautiful UI** - Modern design with smooth animations
- **Responsive Design** - Works perfectly on desktop and mobile
- **TypeScript** - Full type safety throughout the application
- **Server-Side API** - Secure API key handling with Next.js API routes

## 🚀 Live Demo

[View Live App](https://your-weather-app.vercel.app) *(Will be available after deployment)*

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **API:** OpenWeatherMap API
- **Deployment:** Vercel

## 📱 Screenshots

### Desktop View
![Desktop Screenshot](https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Weather+App+Desktop)

### Mobile View
![Mobile Screenshot](https://via.placeholder.com/400x800/4F46E5/FFFFFF?text=Weather+App+Mobile)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app-nextjs.git
   cd weather-app-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OpenWeatherMap API key to `.env.local`:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 API Endpoints

- `GET /api/weather?location=London` - Get weather data for a city
- `GET /api/search?q=Lond` - Search cities for autocomplete

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── weather/route.ts    # Weather data endpoint
│   │   └── search/route.ts     # City search endpoint
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── SearchBar.tsx           # Search with autocomplete
│   └── WeatherCard.tsx         # Weather display component
├── lib/
│   └── utils.ts                # Utility functions
└── types/
    └── weather.ts              # TypeScript interfaces
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your `OPENWEATHER_API_KEY` environment variable
   - Deploy!

### Other Deployment Options

- **Netlify:** Works with static export
- **Railway:** Full-stack deployment
- **DigitalOcean:** App Platform deployment

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

### Next.js Configuration

The app uses Next.js 16 with:
- App Router for file-based routing
- API Routes for server-side endpoints
- Image optimization for weather icons
- TypeScript for type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Vercel](https://vercel.com/) for free hosting

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and TypeScript**