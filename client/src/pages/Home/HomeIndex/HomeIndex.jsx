import React from "react";
import styles from "./HomeIndex.module.scss"

const HomeIndex = () => {

    return(
        <section className={styles.home_index}>
            <div class="section-content relative">
                        
                <div class="row row-small d-flex flex-row w-100">
                    <div class="col tb-pb-0 medium-3 small-6 large-3">
                        <div class="col-inner">          
                            <h2>+<span class="zen-count" data-count="30000" data-start="25000">30000</span></h2>
                            <p>người đã được tạo lộ trình học</p>
                        </div>
                    </div>

                    <div id="col-1269335144" class="col tb-pb-0 medium-3 small-6 large-3">
                        <div class="col-inner">
                            <h2>+<span class="zen-count" data-count="5000" data-start="0">5000</span></h2>
                            <p>học viên thi đỗ TOEIC quốc tế</p>
                        </div>
                    </div>
                    <div id="col-1140380753" class="col tb-pb-0 medium-3 small-6 large-3">
                        <div class="col-inner">     
                            <h2>TOP 1</h2>
                            <p>Đào tạo TOEIC tại Hà Nội</p>
                        </div>
                    </div>
                    <div id="col-953718514" class="col tb-pb-0 medium-3 small-6 large-3">
                        <div class="col-inner">
                            <h2>TOP 1</h2>
                            <p>Đào tạo TOEIC 4 Kỹ năng tại Hà Nội</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    )
}
export default HomeIndex