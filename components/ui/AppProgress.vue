<template>
  <div class="w-full">
    <div class="flex justify-between items-end mb-1.5">
      <div>
        <div class="text-[10px] text-slate-500 font-medium mb-0.5 uppercase tracking-wider">Terkumpul</div>
        <div class="font-bold text-sm text-primary">{{ formattedCurrent }}</div>
      </div>
      <div class="text-right">
        <div class="text-xs text-slate-500">dari <span class="font-medium text-slate-700">{{ formattedTarget }}</span></div>
      </div>
    </div>
    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        class="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number
  target: number
}>()

const { formatRupiah } = useFormat()

const percentage = computed(() => {
  if (props.target <= 0) return 0
  const pct = (props.current / props.target) * 100
  return pct > 100 ? 100 : pct
})

const formattedCurrent = computed(() => formatRupiah(props.current))
const formattedTarget = computed(() => formatRupiah(props.target))
</script>
