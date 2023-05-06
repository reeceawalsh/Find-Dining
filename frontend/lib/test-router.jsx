import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";

const testRender = (ui, { router, ...options } = {}) => {
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

export * from "@testing-library/react";
export { testRender as render };
