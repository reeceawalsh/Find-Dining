import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";

// this component  provides a custom render function (testRender) for testing Next.js components that use the useRouter hook from Next.js' router. The router object isn't available in isolation so a fake one had to be created in order to simulate it in the test environment.
const testRender = (ui, { router, ...options } = {}) => {
    // the wrapper provides a router object to it's children components
    const Wrapper = ({ children }) => (
        <RouterContext.Provider
            value={
                router || { asPath: "/", push: jest.fn(), replace: jest.fn() }
            }
        >
            {children}
        </RouterContext.Provider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
};

// this allows us to import this function as a replacement for @testing-library/react as it will export everything from the testing library and also the above function.

export * from "@testing-library/react";
export { testRender as render };
