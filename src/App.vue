<template>
	<div class="wrapper">
		<div class="container">
			<Table />
		</div>
	</div>
</template>

<script>

import Table from '@/components/Table.vue'

export default {

	components: { Table }

}
</script>

<style>
.container {
	margin: 0 auto;
	margin-top: 25px;
	width: 95vw;
}
</style>