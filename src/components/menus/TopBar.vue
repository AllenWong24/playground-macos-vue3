<script setup lang="ts">
import type { Component } from 'vue'

interface TopBarItemProps {
  hideOnMobile?: boolean
  forceHover?: boolean
  onClick?: () => void
  children: Component
}
</script>
