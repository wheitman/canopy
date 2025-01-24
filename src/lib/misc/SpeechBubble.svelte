<script lang="ts">
  import { onMount } from "svelte";

  // import { page } from "$app/stores";
  export let text: string = "Hello, world";
  export let character: string = "Druid";
  import { createEventDispatcher } from "svelte";
  import { Howl, Howler } from "howler";

  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let synth: SpeechSynthesis;

  export let file = "";

  onMount(() => {
    playAudio(file);
    if (character == "loading") {
      setTimeout(() => {
        character = "loading_done";
        text = "Done!";
      }, 3000);
    }
  });

  function playAudio(file: string) {
    if (character == "loading") {
      var sound = new Howl({
        volume: 0.5,
        rate: 1.0,
        src: [`speech/druid/save_yes.wav`],
        onend: function () {
          console.log("Done speaking!");
          dispatch("doneSpeaking");
        },
      });
    } else {
      var sound = new Howl({
        volume: 0.5,
        rate: 1.0,
        src: [`speech/druid/${file}.mp3`],
        onend: function () {
          console.log("Done speaking!");
          dispatch("doneSpeaking");
        },
      });
    }

    sound.play();
  }

  function speak() {
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    if (text !== "") {
      const utterThis = new SpeechSynthesisUtterance(text);

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
        dispatch("doneSpeaking");
      };

      utterThis.onerror = function (event) {
        console.error(event);
      };

      synth.getVoices().forEach((voice) => {
        console.log(voice.name);
        if (voice.name.includes("David")) utterThis.voice = voice;
      });
      utterThis.pitch = 0.0;
      // utterThis.rate = rate.value;
      synth.speak(utterThis);
    }
  }
</script>

<div
  class="flex flex-row my-4 transition-all"
  in:fade={{ duration: 500 }}
  class:animate-pulse={character == "loading"}
  class:justify-center={character == "loading" || character == "loading_done"}
>
  {#if character == "Druid"}
    <img src="res/druid-thick.svg" alt="" class="w-16" />
  {:else if character == "Steward"}
    <img src="res/steward.svg" alt="" class="w-16" />
  {/if}
  <div
    class="border-4 rounded-3xl p-4 ml-4 text-lg border-neutral-600 speech-bubble font-medium"
    class:font-mono={character == "Steward"}
    class:italic={character == "loading" || character == "loading_done"}
    class:font-bold={character == "loading" || character == "loading_done"}
    class:border-0={character == "loading" || character == "loading_done"}
  >
    {#if character == "loading"}
      <p class="">{text}</p>
    {:else}
      {text}
    {/if}
  </div>
</div>

<style>
  .speech-bubble {
    border-color: #5b916f;
    color: #5b916f;
  }
</style>
