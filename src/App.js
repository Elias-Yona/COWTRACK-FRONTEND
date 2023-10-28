import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
    Branches,
    Cart,
    ColorPicker,
    ColorMapping,
    Customers,
    Locations,
    Managers,
    PaymentMethods,
    ProductCategories,
    Products,
    Sales,
    SalesMetrics,
    Salespersons,
    Stock,
    StockDistributions,
    StockTransfers,
    Supervisors,
    Suppliers,
    Line,
    Area,
    Bar,
    Financial,
    Pie,
    Pyramid,
    Stacked
} from "./pages";

import "./App.css";
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
    const { activeMenu } = useStateContext();

    return (
        <div>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div
                        className="fixed right-4 bottom-4"
                        style={{ zIndex: "1000" }}
                    >
                        <TooltipComponent content="Settings" position="Top">
                            <button
                                type="button"
                                style={{
                                    background: "blue",
                                    borderRadius: "50%",
                                }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>

                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}

                    <div
                        className={
                            activeMenu
                                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        }
                    >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <Navbar />
                        </div>
                        <div>
                            <Routes>
                                {/* dashboard  */}
                                <Route path="/" element={<SalesMetrics />} />
                                <Route
                                    path="/salesmetrics"
                                    element={<SalesMetrics />}
                                />

                                {/* pages  */}
                                <Route path="/customers" element={<Customers />} />
                                <Route
                                    path="/sales persons"
                                    element={<Salespersons />}
                                />
                                <Route
                                    path="/supervisors"
                                    element={<Supervisors />}
                                />
                                <Route path="/managers" element={<Managers />} />
                                <Route path="/suppliers" element={<Suppliers />} />
                                <Route path="/products" element={<Products />} />
                                <Route
                                    path="/product-categories"
                                    element={<ProductCategories />}
                                />
                                <Route path="/locations" element={<Locations />} />
                                <Route path="/branches" element={<Branches />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route
                                    path="/payment-methods"
                                    element={<PaymentMethods />}
                                />
                                <Route path="/sales" element={<Sales />} />
                                <Route path="/stock" element={<Stock />} />
                                <Route
                                    path="/stock-transfers"
                                    element={<StockTransfers />}
                                />
                                <Route
                                    path="/stock-distributions"
                                    element={<StockDistributions />}
                                />

                                {/* apps  */}
                                <Route path="/color-picker" element={<ColorPicker />} />

                                {/* charts  */}
                                <Route path="/line" element={<Line />} />
                                <Route path="/area" element={<Area />} />
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/financial" element={<Financial />} />
                                <Route
                                    path="/color-mapping"
                                    element={<ColorMapping />}
                                />
                                <Route path="/pyramid" element={<Pyramid />} />
                                <Route path="/stacked" element={<Stacked />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
