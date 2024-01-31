import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from "./components/dashboard/Home";
import ArticleSearch from "./components/dashboard/ArticleSearch";
import PersonalizeNewsFeed from "./components/dashboard/PersonalizeNewsFeed";
import UserSetting from "./components/dashboard/UserSetting";

function App() {
    const accessToken = !!localStorage.getItem('access_token');
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
            { accessToken !== false ? (
                <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/article-search-filter" element={<ArticleSearch />} />
                    <Route path="/personalize-news-feed" element={<PersonalizeNewsFeed />} />
                    <Route path="/user-settings" element={<UserSetting />} />
                </>
            ) : <Route
                path="/*"
                element={<Navigate to="/" replace />}
            />
            }
        </Routes>
      </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;
