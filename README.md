# 🎬 CineVault

CineVault is a modern movie discovery and management platform built with React, featuring a sleek dark theme UI and comprehensive movie tracking capabilities.
website link:https://cinevault-sst.vercel.app/

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


![Screenshot from 2025-04-22 01-07-36](https://github.com/user-attachments/assets/ecdcfe62-8f30-4178-a609-0ea4ceae247d)

- Dynamic banner with trending movies
- Smooth horizontal scroll for movie lists
- Backdrop blur effects on hover
- Quick access to watchlist preview

### Navigation & Authentication

![Screenshot from 2025-04-22 01-08-29](https://github.com/user-attachments/assets/24a4db70-0d3d-4215-b3de-eab0f85ff2a7)

- Clean, minimal navbar design
- Avatar-based user menu
- Seamless signup/signin flow
- Dropdown navigation with icons

### Movie Cards
![Screenshot from 2025-04-22 01-09-14](https://github.com/user-attachments/assets/be489a7f-2d73-4c2e-abe7-bd9933310dae)


- Hover effects with action buttons
- Rating display with stars
- Genre chips
- Quick actions (Favorite, Watchlist, Collections)
- Trailer button with modal

### Watchlist Management
![Screenshot from 2025-04-22 01-10-08](https://github.com/user-attachments/assets/61679724-1304-46d0-800a-3ba7e9c8996f)


- Grid/List view toggle
- Advanced sorting and filtering
- Movie statistics dashboard
- Drag-and-drop organization
- Responsive layout

### Favorites Section
![Screenshot from 2025-04-22 01-16-16](https://github.com/user-attachments/assets/dda89498-6dd0-4d6e-8e47-ce0036e8aa0b)


- Similar to watchlist but with heart theme
- Rose accent colors
- Rating-based organization
- Quick removal functionality

### Movie Details

![Screenshot from 2025-04-22 01-16-44](https://github.com/user-attachments/assets/00352519-552c-4da8-916f-1eb93efaca54)


- Hero section with backdrop
- Cast and crew carousel
- Production details
- Trailer integration
- Related movies

### Collections
- COMING SOON
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
}
```

### Component Architecture

```jsx
// Example component structure
export default function Mycard({ movieObj, maxPopularity }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const Info = useContext(Context)
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [InCollection, setInCollection] = useState(new Set())
  const [trailerKey, setTrailerKey] = useState("")
  const [isSignupModalOpen, setSignupModalOpen] = useState(false)

  const {
    isOpen: isTrailerOpen,
    onOpen: onTrailerOpen,
    onOpenChange: onTrailerOpenChange,
  } = useDisclosure()

  const ensureLoggedIn = (action) => {
    const user = Info.user // Use user from context
    if (!user) {
      setSignupModalOpen(true)
      return false
    }
    action()
    return true
  }

  const handleWatchlist = () => {
    ensureLoggedIn(() => {
      Info.handleWatchlist(movieObj)
    })
  }

  const handleFavourites = () => {
    ensureLoggedIn(() => {
      Info.handleFavourites(movieObj)
    })
  }

  const handleCollection = (collectionKey, movieName) => {
    ensureLoggedIn(() => {
      setInCollection((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(collectionKey)) {
          Info.removeFromCollection(collectionKey, movieName)
          newSet.delete(collectionKey)
        } else {
          Info.addToCollection(collectionKey, movieName)
          newSet.add(collectionKey)
        }
        return newSet
      })
    })
  }

  useEffect(() => {
    const isBookmarked =
      Info.watchlist?.some((movie) => movie.id === movieObj.id) || false
    const isLiked =
      Info.Favourites?.some((movie) => movie.id === movieObj.id) || false
    setBookmarked(isBookmarked)
    setLiked(isLiked)
  }, [Info.watchlist, Info.Favourites, movieObj])

  useEffect(() => {
    if (isTrailerOpen) {
      Info.MovieVideos(movieObj.id).then((response) => {
        const videos = response.data.results || []
        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true
          ) ||
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          null

        setTrailerKey(trailer?.key || "")
      })
    }
  }, [isTrailerOpen, movieObj.id, Info])

  return (
    <>
      <Card
        isFooterBlurred
        isPressable
        className="border-none rounded-b-[1rem] rounded-tr-[1rem] w-[200px] h-[500px]"
        radius="none"
        onPress={onOpen}
      >
        <Image
          alt={movieObj.title}
          className="object-cover hover:brightness-50"
          radius="none"
          height={300}
          width={200}
          src={
            movieObj.poster_path
              ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}`
              : "/fallback-image.jpg"
          }
        />

        <CardBody className="flex flex-col justify-between h-full">
          <div className="flex flex-col flex-grow">
            <div className="w-full relative">
              <Rating rating={movieObj.vote_average} />
              <LikeDropdown
                movieObj={movieObj}
                Info={Info}
                bookmarked={bookmarked}
                setBookmarked={setBookmarked}
                liked={liked}
                setLiked={setLiked}
                InCollection={InCollection}
                HandleInCollection={handleCollection}
                ensureLoggedIn={ensureLoggedIn}
              />
            </div>
            <Spacer y={2} />
            <h1 style={{ fontFamily: "lora" }} className="text-wrap">
              {movieObj.title}
            </h1>
          </div>

          <div className="mt-auto flex justify-center relative top-[5px]">
            <Button
              color="primary"
              variant="light"
              startContent={<PlayIconSVG />}
              className="text-[17px]"
              radius="full"
              onPress={onTrailerOpen}
            >
              <p className="relative left-[-5px] top-[2px]">Trailer</p>
            </Button>
          </div>

          <InfoModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            movieObj={movieObj}
            maxPopularity={maxPopularity}
          />

          <TrailerModal
            isTrailerOpen={isTrailerOpen}
            onTrailerOpenChange={onTrailerOpenChange}
            trailerKey={trailerKey}
          />
        </CardBody>
      </Card>

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSignup={(user) => {
          Info.setUser(user)
        }}
      />
    </>
  )
}
```

### API Integration

```javascript
// Example of TMDb API usage
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e7ab7217c6e7f635c3bc6191429655c8&language=en-US&page=1`
      )
      .then((response) => {
        console.log(response.data.results)
        setImg(
          response.data.results
            .filter((obj) => obj.backdrop_path != null)
            .map((obj) => {
              return `https://image.tmdb.org/t/p/original/${obj.backdrop_path}`
            })
        )
      })
      .catch((err) => {
        console.log("Error in fetching data")
      })
  }, [])
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
| ![Screenshot from 2025-04-25 19-44-06](https://github.com/user-attachments/assets/a82cdae8-942a-4bb6-bcca-07f73ef28dc3) | ![Screenshot from 2025-04-25 19-45-24](https://github.com/user-attachments/assets/c95bb979-e390-46c0-ad65-64c9a27862a8) |

### Feature Demonstrations

| Feature        | Screenshot                                       |
| -------------- | ------------------------------------------------ |
| Movie Details  | ![Screenshot from 2025-04-25 19-47-27](https://github.com/user-attachments/assets/211b44bb-71aa-436d-8eca-f24b1369d15d) |
| Watchlist      | ![Screenshot from 2025-04-25 19-47-49](https://github.com/user-attachments/assets/4922067b-5952-4588-b085-9f884223d3b3) |

</details>

## 🔧 Configuration

### Environment Variables

```env
VITE_TMDB_API_KEY=api_key
VITE_APP_URL=http://localhost:3000
```

### Build Configuration

```javascript
// vite.config.js example
export default defineConfig({
  plugins: [react()],
})
```

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDb)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Hero UI](https://heroui.dev/)
