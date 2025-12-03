# 🎮 Streamer Website Template

**Website Demo:** [View Demo](https://streamer.bkubiak.dev/)

<a href="https://getnotify.app"><img src="https://getnotify.app/icon.png" width="32" height="32" alt="GetNotify.app"></a> [GetNotify.app](https://getnotify.app) Discord Notifaction for Youtube, TikTok, Kick and Twitch.

A modern, minimalist, and high-performance website template designed specifically for streamers and content creators. Built with the latest web technologies to provide a premium look and feel.


## ✨ Key Features

- **🔴 Live Status Integration**: Automatically checks and displays your live status from , YouTube, Kick, or TikTok directly in the header. i will add twitch on few stars
- **🎨 Premium Monochrome Design**: A sleek, black-and-white aesthetic with glassmorphism effects, subtle animations, and spotlight interactions.
- **📱 Fully Responsive**: Optimized for all devices - desktops, tablets, and mobile phones.
- **📊 Real-time Stats**: Showcase your growth with animated counters for followers, hours streamed, and community members.
- **🔗 Social Hub**: Centralize all your social media links (Twitch, Discord, Instagram, TikTok, etc.) in one beautiful section.
- **⚙️ Gear & Setup**: A dedicated section to list your PC specs, peripherals, and streaming equipment.
- **🛠️ Admin Panel**: A built-in, user-friendly admin interface to manage all site content without touching a single line of code.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these steps to get your website up and running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xqbkubiak/streamer-website-template.git
   cd streamer-website-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Visit `http://localhost:3000` to see your new website.

## ⚙️ Configuration

### Admin Panel
You can easily configure the website content through the built-in Admin Panel.

1. Navigate to `http://localhost:3000/admin`.
2. Enter the default password: `admin123`.
3. Update your:
   - **Stream Config**: Platform and username.
   - **Metadata**: SEO title and description.
   - **Hero Section**: Titles, tagline, and links.
   - **Stats**: Follower counts and other metrics.
   - **Social Links**: Your social media profiles.
   - **Gear**: Your hardware and equipment list.

### Manual Configuration
Alternatively, you can manually edit the `site-config.json` file in the root directory if you prefer working with code.

### 🔑 Obtaining YouTube API Key

To display your live status from YouTube, you need a Google Cloud API Key with the **YouTube Data API v3** enabled.

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project (or select an existing one).
3.  In the search bar, type **"YouTube Data API v3"** and select it.
4.  Click **Enable**.
5.  Go to **Credentials** (in the left sidebar) → **Create Credentials** → **API Key**.
6.  Copy the generated API Key.
7.  Go to your website's **Admin Panel** (`/admin`), select **YouTube** as your platform, and paste the key into the **API Key** field.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for the streaming community.
