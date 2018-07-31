<!--
    数据的主要展示区域
    包含左边区域，中间区域，右边区域
    左边是辅助区域，辅助中间区域，在超小型设备上不可见，例如：目录
    中间是主要的数据展示区域
    右边是额外的相关信息，例如：作者
-->
<template>
    <section class="content-wrap">
        <div class="container">
            <div class="row">
                <main class="col-sm-10 col-md-10 col-lg-10" id="content">
                    <div class="row">                        
                        <div class="col-sm-2 col-md-2 col-lg-2 hidden-xs sidebar" id="left">
                            <!--在超小型设备上不可见-->
                            <slot name='left'></slot>
                        </div>
                        
                        <div class="col-sm-10 col-md-10 col-lg-10" id="data">
                            <!--内容栏-->
                            <slot name='data'></slot>
                            <div class="row" id="more">
                                <slot name='more'></slot>
                            </div>
                        </div>
                    </div>
                </main>

                <aside class="col-sm-2 col-md-2 col-lg-2 sidebar" id='right'>
                    <!--附属信息展示-->
                    <slot name='right'></slot>
                </aside>
            </div>
        </div>
    </section>
</template>
