# 🎬 CineVault

CineVault is a modern movie discovery and management platform built with React, featuring a sleek dark theme UI and comprehensive movie tracking capabilities.

## ✨ Features

- **Movie Discovery**: Browse popular and top-rated movies
- **Watchlist Management**: Save movies to watch later
- **Favorites Collection**: Keep track of your favorite movies
- **Custom Collections**: Create and manage movie collections
- **Advanced Sorting**: Sort movies by date, rating, or title
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Search**: Quick search through your collections
- **Trailer Integration**: Watch trailers directly in the app
- **Movie Details**: Comprehensive movie information including cast, crew, and ratings

## 🛠️ Built With

- React.js
- Tailwind CSS
- Hero UI Components
- Framer Motion
- TMDb API
- Lucide Icons

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cinevault.git
```

2. Install dependencies:

```bash
cd cinevault
npm install
```

3. Create a `.env` file and add your TMDb API key:

```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## 📱 Features Overview

### Home Page

- Trending movies carousel
- Popular movies section
- Top rated movies
- Your watchlist preview

### Movie Details

- Full movie information
- Cast and crew details
- Watch trailer
- Add to favorites/watchlist

### Watchlist & Favorites

- Grid/List view toggle
- Advanced sorting options
- Quick search functionality
- Movie removal

### Collections

- Create custom collections
- Add movies to collections
- Manage collection contents
- Collection statistics

## 🎨 Design Features

- Dark theme optimized for movie browsing
- Responsive layout
- Smooth animations
- Backdrop blur effects
- Modern card designs
- Intuitive navigation

## 📸 Component Showcase

### Home Page

![Home Page Screenshot](.github/screenshots/home.png)

- Dynamic banner with trending movies
- Smooth horizontal scroll for movie lists
- Backdrop blur effects on hover
- Quick access to watchlist preview

### Navigation & Authentication

![Navigation Screenshot](.github/screenshots/nav.png)

- Clean, minimal navbar design
- Avatar-based user menu
- Seamless signup/signin flow
- Dropdown navigation with icons

### Movie Cards

![Movie Cards Screenshot](.github/screenshots/cards.png)

- Hover effects with action buttons
- Rating display with stars
- Genre chips
- Quick actions (Favorite, Watchlist, Collections)
- Trailer button with modal

### Watchlist Management

![Watchlist Screenshot](.github/screenshots/watchlist.png)

- Grid/List view toggle
- Advanced sorting and filtering
- Movie statistics dashboard
- Drag-and-drop organization
- Responsive layout

### Favorites Section

![Favorites Screenshot](.github/screenshots/favorites.png)

- Similar to watchlist but with heart theme
- Rose accent colors
- Rating-based organization
- Quick removal functionality

### Movie Details

![Movie Details Screenshot](.github/screenshots/details.png)

- Hero section with backdrop
- Cast and crew carousel
- Production details
- Trailer integration
- Related movies

### Collections

![Collections Screenshot](.github/screenshots/collections.png)

- Custom collection creation
- Movie grouping
- Date tracking
- Collection statistics

## 💡 Implementation Details

### State Management

- Context API for global state
- Local Storage for persistence
- Efficient update patterns

### Styling Approach

```css
/* Example of component styling */
.movie-card {
  @apply bg-black/40 backdrop-blur-sm;
  /* Show how styling is done */
}
```

### Component Architecture

```jsx
// Example component structure
const MovieCard = ({ movie }) => {
  // Show how components are built
}
```

### API Integration

```javascript
// Example of TMDb API usage
const fetchMovies = async () => {
  // Show how API calls are made
}
```

## 📝 Development Notes

### Key Features Implementation

1. **Infinite Scroll**

   - Used Intersection Observer
   - Efficient data loading
   - Memory management

2. **Search & Filter**

   - Debounced search
   - Multiple filter combinations
   - Sort algorithms

3. **Animations**

   - Framer Motion integration
   - Performance optimization
   - Smooth transitions

4. **Responsive Design**
   - Mobile-first approach
   - Breakpoint system
   - Layout shifts handling

## 📱 Screenshots Gallery

<details>
<summary>Click to expand</summary>

### Home Page Views

| Desktop                                              | Mobile                                             |
| ---------------------------------------------------- | -------------------------------------------------- |
| [Desktop Home](.github/screenshots/desktop-home.png) | [Mobile Home](.github/screenshots/mobile-home.png) |

### Feature Demonstrations

| Feature        | Screenshot                                       |
| -------------- | ------------------------------------------------ |
| Movie Details  | [View](.github/screenshots/movie-details.png)    |
| Watchlist      | [View](.github/screenshots/watchlist-view.png)   |
| Collections    | [View](.github/screenshots/collections-view.png) |
| Search Results | [View](.github/screenshots/search-results.png)   |

</details>

## 🔧 Configuration

### Environment Variables

```env
VITE_TMDB_API_KEY=your_api_key
VITE_APP_URL=http://localhost:3000
```

### Build Configuration

```javascript
// vite.config.js example
export default {
  // Show build configuration
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDb)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Hero UI](https://heroui.dev/)
