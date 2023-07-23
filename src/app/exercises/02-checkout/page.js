"use client";
import React from "react";

import DATA from "./data";
import reducer from "./reducer";
import StoreItem from "./StoreItem";
import CheckoutFlow from "./CheckoutFlow";
import "./styles.css";
import { set } from "date-fns";

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
		const savedItems = window.localStorage.getItem("cart-items");

		if (savedItems === null) {
			return;
		}

    dispatch({
      type: 'load-items',
      items: JSON.parse(savedItems),
    });
    setIsLoading(false);
  }, [])

	React.useEffect(() => {
		window.localStorage.setItem("cart-items", JSON.stringify(items));
	}, [items]);

	return (
		<>
			<h1>Neighborhood Shop</h1>

			<main>
				<div className="items">
					{DATA.map((item) => (
						<StoreItem
							key={item.id}
							item={item}
							handleAddToCart={(item) => {
								dispatch({
									type: "add-item",
									item,
								});
							}}
						/>
					))}
				</div>

        <CheckoutFlow
          loading={isLoading}
					items={items}
					taxRate={0.15}
					handleDeleteItem={(item) =>
						dispatch({
							type: "delete-item",
							item,
						})
					}
				/>
			</main>
		</>
	);
}

export default CheckoutExercise;
