<template>
  <div class="OverlayBadge">
    <div class="float" :class="position" :style="styles" @click="onClick ? onClick() : () => {}">
      <slot name="float">{{ (Number(count) < 1000) ? count : '1k+' }}</slot>
    </div>
    <slot>
      <div></div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "overlay-badge",
  props: {
    type: String,
    count: {
      type: [Number, String],
      default: 0
    },
    position: {
      type: String,
      default: "top-right"
      // 'top-right', 'bottom-right', 'top-left', 'bottom-left'
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    styles() {
      let style = "";
      switch (this.type) {
        case "primary":
          style = "background-color: #007bff; color: white;";
          break;
        case "secondary":
          style = "background-color: #6c757d; color: white;";
          break;
        case "success":
          style = "background-color: #28a745; color: white;";
          break;
        case "info":
          style = "background-color: #17a2b8; color: white;";
          break;
        case "warning":
          style = "background-color: #ffc107; color: black;";
          break;
        case "danger":
          style = "background-color: #dc3545; color: white;";
          break;
        default:
          style = "background-color: #007bff; color: white;";
      }
      if (this.onClick) style += ` cursor: pointer;`;
      else style += ` cursor: default;`;
      return style;
    }
  }
};
</script>

<style scoped>
.OverlayBadge {
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;
}
.float {
  min-width: 1.5em;
  text-align: center;
  position: absolute;
  z-index: 1000;
  font-size: 0.7em;
  font-weight: 700;
  border-radius: 50%;
}
.top-right {
  top: 0;
  right: 0;
  margin-top: -8px;
  margin-right: -8px;
}
.bottom-right {
  bottom: 0;
  right: 0;
  margin-bottom: -8px;
  margin-right: -8px;
}
.top-left {
  top: 0;
  left: 0;
  margin-top: -8px;
  margin-right: -8px;
}
.bottom-left {
  bottom: 0;
  left: 0;
  margin-top: -8px;
  margin-right: -8px;
}
</style>
