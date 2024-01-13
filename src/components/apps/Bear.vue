<script setup lang="ts">
interface ContentProps {
  contentID: string
  contentURL: string
}

interface BearState extends ContentProps {
  curSidebar: number
  curMidbar: number
  midbarList: BearMdData[]
}

const state = reactive<BearState>({
  curSidebar: 0,
  curMidbar: 0,
  midbarList: bear[0].md,
  contentID: bear[0].md[0].id,
  contentURL: bear[0].md[0].file,
})

function setMidBar(items: BearMdData[], index: number) {
  setState({
    curSidebar: index,
    curMidbar: 0,
    midbarList: items,
    contentID: items[0].id,
    contentURL: items[0].file,
  })
}

function setContent(id: string, url: string, index: number) {
  setState({
    ...state,
    curMidbar: index,
    contentID: id,
    contentURL: url,
  })
}
</script>

<template>
  <div class="bear font-avenir h-full w-full flex">
    <div class="w-44 flex-none">
      <Sidebar cur="{state.curSidebar}" set-mid-bar="{setMidBar}" />
    </div>
    <div class="w-60 flex-none">
      <Middlebar
        items="{state.midbarList}"
        cur="{state.curMidbar}"
        set-content="{setContent}"
      />
    </div>
    <div class="flex-grow">
      <Content content-i-d="{state.contentID}" content-u-r-l="{state.contentURL}" />
    </div>
  </div>
</template>
