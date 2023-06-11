import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TabGrid from "components/user/cards/TabBookCardGrid.js";
import SubscribeNewsLetterForm from "components/user/forms/TwoColContactUsWithIllustration";

export default ({ roundedHeaderButton }) => {
    return (
        <AnimationRevealPage>
            <TabGrid
                heading={
                    <>
                        Danh sách sản phẩm 
                    </>
                }
            />
            <SubscribeNewsLetterForm />
        </AnimationRevealPage>
    );
}

