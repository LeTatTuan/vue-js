<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Account</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Profile Information</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Change Password</DropdownMenuItem>
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>