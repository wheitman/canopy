<script lang="ts">
  // import { is_connected, warning_count, error_count } from "$lib/stores";

  import Icon from "$lib/misc/Icon.svelte";
  import { Button } from "bits-ui";
  import { Dialog, Separator, Label } from "bits-ui";
  import { fade } from "svelte/transition";
  import { rosbridge_ip, rosbridge_port } from "$lib/stores";
  import Cookies from "js-cookie";

  export let mini: boolean = false;

  let icon_size = mini ? "2rem" : "10rem";

  function updateIpAndPort() {
    let ip_input = document.getElementById(
      "rosbridgeIpInput",
    ) as HTMLInputElement;

    rosbridge_ip.set(ip_input.value);

    let port_input = document.getElementById(
      "rosbridgePortInput",
    ) as HTMLInputElement;

    rosbridge_port.set(port_input.value);

    // cookies.
    Cookies.set("rosbridge/port", port_input.value, { expires: 365 });
    Cookies.set("rosbridge/ip", ip_input.value, { expires: 365 });

    console.log(`Set the cookie to value of ${Cookies.get("rosbridge/ip")}`);

    location.reload(); // Reload the page
  }
</script>

<div class="flex flex-col justify-center mx-auto">
  {#if mini}
    <Dialog.Root>
      <Dialog.Trigger
        class="inline-flex h-12 w-12 items-center justify-center rounded-input bg-dark
   text-[15px] font-semibold text-background shadow-mini
  hover:bg-black/5 active:scale-98 active:transition-all rounded-xl"
      >
        <div class="flex flex-col animate-pulse">
          <Icon id="link_off" size={icon_size}></Icon>

          <p class="text-xs">Disconnected from Steward</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          transition={fade}
          transitionConfig={{ duration: 150 }}
          class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
          transition={fade}
          class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
        >
          <Dialog.Title
            class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
            >Where is Rosbridge running?</Dialog.Title
          >
          <!-- <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-muted" /> -->
          <!-- <Dialog.Description class="text-sm text-foreground-alt">
          Create and manage API keys. You can create multiple keys to organize
          your applications.
        </Dialog.Description> -->
          <div class="flex flex-col items-start gap-1 pb-11 pt-7">
            <div class="relative w-full flex flex-row">
              <p class="w-16">IP</p>
              <input
                id="rosbridgeIpInput"
                class="inline-flex h-input w-full items-center rounded-card-sm border border-border-input bg-background px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md h-8"
                type="text"
                autocomplete="off"
                value={$rosbridge_ip}
              />

              <!-- <LockKeyOpen
              class="absolute right-4 top-[14px] size-[22px] text-dark/30"
            /> -->
            </div>

            <div class="relative w-full flex flex-row pt-4">
              <p class="w-16">Port</p>
              <input
                id="rosbridgePortInput"
                class="inline-flex h-input w-full items-center rounded-card-sm border border-border-input bg-background px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md h-8"
                type="text"
                autocomplete="off"
                value={$rosbridge_port}
              />

              <!-- <LockKeyOpen
              class="absolute right-4 top-[14px] size-[22px] text-dark/30"
            /> -->
            </div>
          </div>

          <div class="flex w-full justify-end">
            <Dialog.Close
              class="inline-flex h-input items-center justify-center rounded-input bg-dark px-[50px] text-[15px] font-semibold text-background shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
              on:click={(e) => {
                updateIpAndPort();
              }}
            >
              Save
            </Dialog.Close>
          </div>
          <Dialog.Close
            class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
          >
            <div>
              <!-- <X class="size-5 text-foreground" /> -->
              X
              <span class="sr-only">Close</span>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  {:else}
    <Icon id="link_off" size={icon_size}></Icon>
    <p class="flex flex-row justify-center">Disconnected from Steward</p>
    <div class="flex flex-row justify-center italic">
      <Icon id="autorenew" spin></Icon>
      <p>Trying to reconnect to {$rosbridge_ip}:{$rosbridge_port}</p>
    </div>
    <Dialog.Root>
      <Dialog.Trigger
        class="inline-flex h-12 items-center justify-center rounded-input bg-dark
    px-[21px] text-[15px] font-semibold text-background shadow-mini
    hover:bg-black/5 active:scale-98 active:transition-all rounded-xl"
      >
        Change IP or port
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          transition={fade}
          transitionConfig={{ duration: 150 }}
          class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
          transition={fade}
          class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
        >
          <Dialog.Title
            class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
            >Where is Rosbridge running?</Dialog.Title
          >
          <!-- <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-muted" /> -->
          <!-- <Dialog.Description class="text-sm text-foreground-alt">
            Create and manage API keys. You can create multiple keys to organize
            your applications.
          </Dialog.Description> -->
          <div class="flex flex-col items-start gap-1 pb-11 pt-7">
            <div class="relative w-full flex flex-row">
              <p class="w-16">IP</p>
              <input
                id="rosbridgeIpInput"
                class="inline-flex h-input w-full items-center rounded-card-sm border border-border-input bg-background px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md h-8"
                type="text"
                autocomplete="off"
                value={$rosbridge_ip}
              />

              <!-- <LockKeyOpen
                class="absolute right-4 top-[14px] size-[22px] text-dark/30"
              /> -->
            </div>

            <div class="relative w-full flex flex-row pt-4">
              <p class="w-16">Port</p>
              <input
                id="rosbridgePortInput"
                class="inline-flex h-input w-full items-center rounded-card-sm border border-border-input bg-background px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md h-8"
                type="text"
                autocomplete="off"
                value={$rosbridge_port}
              />

              <!-- <LockKeyOpen
                class="absolute right-4 top-[14px] size-[22px] text-dark/30"
              /> -->
            </div>
          </div>

          <div class="flex w-full justify-end">
            <Dialog.Close
              class="inline-flex h-input items-center justify-center rounded-input bg-dark px-[50px] text-[15px] font-semibold text-background shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
              on:click={(e) => {
                updateIpAndPort();
              }}
            >
              Save
            </Dialog.Close>
          </div>
          <Dialog.Close
            class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
          >
            <div>
              <!-- <X class="size-5 text-foreground" /> -->
              X
              <span class="sr-only">Close</span>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  {/if}
</div>

<style lang="postcss">
</style>
