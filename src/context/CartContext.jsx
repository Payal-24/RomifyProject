import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const CART_STORAGE_KEY = "romify_cart";

const initialState = {
  items: [],
};

function loadInitialState() {
  if (typeof window === "undefined") return initialState;

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return initialState;

    const parsedCart = JSON.parse(storedCart);
    if (Array.isArray(parsedCart?.items)) {
      return { items: parsedCart.items };
    }
  } catch (error) {
    console.warn("Unable to restore cart from localStorage", error);
  }

  return initialState;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product.name === product.name
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.name === product.name
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity }],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.name !== action.payload.name
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  const guardedDispatch = useMemo(() => {
    return (action) => {
      if (action?.type === "ADD_TO_CART" && !loading && !isAuthenticated) {
        navigate("/login", {
          replace: true,
          state: {
            from: location.pathname,
            authMessage: "Please login first to shop.",
          },
        });
        return;
      }

      dispatch(action);
    };
  }, [dispatch, isAuthenticated, loading, location.pathname, navigate]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch: guardedDispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
