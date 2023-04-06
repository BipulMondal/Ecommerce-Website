const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "SET_API_DATA":
           const featureData = action.payload.filter((curElem) => {
            return curElem.isFeatured === true;
           });

           const applianceData = action.payload.filter((curElem) => {
            return curElem.isAppliance === true;
           }) 

           const footStyleData = action.payload.filter((curElem) => {
            return curElem.isFootStyle === true;
           })

           const beautyProductData = action.payload.filter((curElem) => {
            return curElem.isBeauty === true;
           })
           const babyToyDiscountData = action.payload.filter((curElem) => {
            return curElem.isBabyDiscount === true;
           })

           const mobileProductsData = action.payload.filter((curElem) => {
            return curElem.category === 'mobile';
           })

           const fashionProductsData = action.payload.filter((curElem) => {
            return curElem.category === 'fashion';
           })

           const decorationProductsData = action.payload.filter((curElem) => {
            return curElem.category === 'decoration';
           })

           const babyToyProductsData = action.payload.filter((curElem) => {
            return curElem.category === 'toys';
           })

           const electronicProductsdata = action.payload.filter((curElem) => {
            return curElem.category === 'speaker' ||
                    curElem.category === 'laptop'  ||
                    curElem.category === 'grinder' ||
                    curElem.category === 'powerbabk' ||
                    curElem.category === 'oven' ||
                    curElem.category === 'induction' ||
                    curElem.category === 'kettle' ||
                    curElem.category === 'air fryer' ||
                    curElem.category === 'trimer' ||
                    curElem.category === 'printer' ||
                    curElem.category === 'hair dryer';

           })

           return {
            ...state,
            isLoading: false,
            products: action.payload,
            featureProducts: featureData,
            applianceProducts: applianceData,
            footStyleProducts: footStyleData,
            beautyProducts: beautyProductData,
            mobileProducts: mobileProductsData,
            babyToyProduct: babyToyProductsData,
            electronicProduct: electronicProductsdata,
            babyToyDiscount: babyToyDiscountData,
            fashionProducts:fashionProductsData,
            decorationProducts:decorationProductsData,
           }

        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case "SET_SINGLE_LOADING": 
            return {
                ...state,
                isSingleLoading: true
            }
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                singleProduct: action.payload,
            }
        case "SET_SINGLE_ERROR": 
            return {
                ...state,
                isSingleLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export default ProductReducer;