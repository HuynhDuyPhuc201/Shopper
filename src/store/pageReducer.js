import { TOGGLE_CART_MODAL, TOGGLE_SEARCH_MODAL } from './type';

const initState = {
    openSearchModal: false,
    openCartModal: false,
};

export const toggleSearchDrawerAction = () => ({ type: TOGGLE_SEARCH_MODAL });
export const toggleCartDrawerAction = () => ({ type: TOGGLE_CART_MODAL });

export default function pageReducer(state = initState, action) {
    switch (action.type) {
        case TOGGLE_SEARCH_MODAL:
            return {
                ...state,
                openSearchModal: !state.openSearchModal,
            };
        case TOGGLE_CART_MODAL:
            return {
                ...state,
                openCartModal: !state.openCartModal,
            };
        default:
            return state;
    }
}
