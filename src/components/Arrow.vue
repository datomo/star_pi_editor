<template>
    <div class="arrow-wrapper">
        <svg height="100" width="200">
            <defs>
                <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
                        orient="auto">
                    <path d="M2,2 L2,11 L10,6 L2,2" style="fill: white;"/>
                </marker>
            </defs>

            <line x1="10" y1="10" x2="180" y2="10" class="arrow"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Arrow"
    }
</script>

<style lang="scss" scoped>
    .arrow-wrapper {

    }
    .arrow {
        stroke: white;
        stroke-width: 2;
        marker-end: url(#markerArrow)
    }
</style>