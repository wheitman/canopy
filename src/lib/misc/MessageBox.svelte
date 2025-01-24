<script lang="ts">
  import Icon from "./Icon.svelte";

  export const message: string = "Try painting some bounds.";
</script>

<div class="absolute bottom-0 pb-4 pr-4 z-50">
  <div id="box" class="flex flex-row justify-center">
    <Icon id="face" size="2rem" />
    <div class="speech left">{message}</div>
  </div>
</div>

<style>
  .speech {
    font-size: 1rem;
    color: #fff;
    background: var(--color-theme-1);

    /* (A2) DIMENSIONS */
    padding: 1rem;
    border-radius: 10px;
    max-width: 600px;
  }

  /* (B) USE ::AFTER TO CREATE THE "CALLOUT" */
  .speech::after {
    display: block;
    width: 0;
    content: "";
    border: 15px solid transparent;
  }

  /* (C) "CALLOUT" DIRECTIONS */
  .speech.up::after {
    border-bottom-color: #a53d38;
    border-top: 0;
  }
  .speech.down::after {
    border-top-color: #a53d38;
    border-bottom: 0;
  }
  .speech.left::after {
    border-right-color: var(--color-theme-1);
    border-left: 0;
  }
  .speech.right::after {
    border-left-color: #a53d38;
    border-right: 0;
  }

  /* (D) POSITION THE CALLOUT */
  .speech {
    position: relative;
    margin-left: 1rem;
    /* margin: 1rem; */
  }
  .speech::after {
    position: absolute;
  }
  .speech.up::after {
    top: -15px;
    left: calc(50% - 15px);
  }
  .speech.down::after {
    bottom: -15px;
    left: calc(50% - 15px);
  }
  .speech.left::after {
    left: -15px;
    top: calc(50% - 15px);
  }
  .speech.right::after {
    right: -15px;
    top: calc(50% - 15px);
  }
</style>
