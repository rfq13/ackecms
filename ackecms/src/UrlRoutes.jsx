import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './screens/Home/Home';

export default function Url_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  )
}
