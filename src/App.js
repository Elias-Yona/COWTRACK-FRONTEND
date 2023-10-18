import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "./App.css";

const App = () => {
    const activeMenu = true;
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
                            Sidebar
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            Sidebar 2
                        </div>
                    )}

                    <div
                        className={
                            `dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full ${activeMenu ? 'md:ml-72 ' : 'flex-2'}`
                    }>
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <p>Navbar</p>
                        </div>
                        <div>
                        <Routes>
                            {/* dashboard  */}
                            <Route path="/" element="Sales Metrics" />
                            <Route path="/sales-metrics" element="Sales Metrics" />

                            {/* pages  */}
                            <Route path="/customers" element="Customers" />
                            <Route path="/salespersons" element="Salespersons" />
                            <Route path="/supervisors" element="Supervisors" />
                            <Route path="/managers" element="Managers" />
                            <Route path="/suppliers" element="Suppliers" />
                            <Route path="/products" element="Products" />
                            <Route path="/product-categories" element="ProductsCategories" />
                            <Route path="/stock" element="Stock" />          
                            <Route path="/locations" element="Locations" />
                        </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
