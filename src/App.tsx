import "./App.css";
import Table from "./components/table/Table";
import DefaultLayout from "./layout/default";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import BrandsOverviewPage from "./pages/brands/overview";
import AddNewBrandPage from "./pages/brands/edit-brand";
import EditProductPage from "./pages/products/edit-product";
import ProductOVerviewPage from "./pages/products/product-overview";
import ImageOverviewPage from "./pages/images/image-overview";
import CategorySelect from "./components/forms/category-select";
import SeriesOverviewPage from "./pages/series/series-overview";
import EditSeriesPage from "./pages/series/edit-series";
import EditDevicePage from "./pages/device/edit-device";
import DeviceOverviewPage from "./pages/device/device-overview";
import SkinOverviewPage from "./pages/skins/skin-overview";
import EditSkinPage from "./pages/skins/edit-skin";
import UserOverviewPage from "./pages/users/user-overview";
import EditUserPage from "./pages/users/edit-user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          {/* Users */}
          <Route
            path="/users"
            element={<Navigate to="/users/overview" replace />}
          />
          <Route path="/users/overview" element={<UserOverviewPage />} />
          <Route path="/users/add" element={<EditUserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />

          {/* Skins */}
          <Route
            path="/skins"
            element={<Navigate to="/skins/overview" replace />}
          />
          <Route path="/skins/overview" element={<SkinOverviewPage />} />
          <Route path="/skins/add" element={<EditSkinPage />} />
          <Route path="/skins/edit/:id" element={<EditSkinPage />} />

          {/* Series */}
          <Route
            path="/series"
            element={<Navigate to="/series/overview" replace />}
          />
          <Route path="/series/overview" element={<SeriesOverviewPage />} />
          <Route path="/series/add" element={<EditSeriesPage />} />
          <Route path="/series/edit/:id" element={<EditSeriesPage />} />

          {/* Brands */}
          <Route
            path="/brands"
            element={<Navigate to="/brands/overview" replace />}
          />
          <Route path="/brands/overview" element={<BrandsOverviewPage />} />
          <Route path="/brands/add" element={<AddNewBrandPage />} />
          <Route path="/brands/edit/:id" element={<AddNewBrandPage />} />

          {/* Devices */}
          <Route
            path="/devices"
            element={<Navigate to="/devices/overview" replace />}
          />
          <Route path="/devices/overview" element={<DeviceOverviewPage />} />
          <Route path="/devices/add" element={<EditDevicePage />} />
          <Route path="/devices/edit/:id" element={<EditDevicePage />} />

          {/* Products */}
          <Route path="/products" element={<ProductOVerviewPage />} />
          <Route path="/products/add" element={<EditProductPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
          <Route path="/categories" element={<CategorySelect />} />

          {/* Images */}
          <Route path="/images" element={<ImageOverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
