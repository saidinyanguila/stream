import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import WatchTv from "./pages/WatchTv";
import Category from './pages/Category';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter basename="/stream">
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/search/" element={<Search />} />

				<Route path="/movies/" element={<Category title="Movies" />} />
				<Route path="/tv/" element={<Category title="TV Shows" />} />
				
				<Route path="/watch/movie/:id" element={<Watch />} />
				<Route path="/watch/tv/:id" element={<WatchTv />} />

				<Route path="/player/" element={<Watch />} />

				{/* <Route path="/watchlist/" element={<Watch />} /> */}
				{/* <Route path="/account/" element={<Watch />} /> */}
				
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</QueryClientProvider>
);

export default App
