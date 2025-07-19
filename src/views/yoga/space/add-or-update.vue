<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="场地名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="场地名称"></el-input>
  </el-form-item>
  <el-form-item label="容纳人数" prop="capacity">
      <el-input v-model="dataForm.capacity" placeholder="容纳人数"></el-input>
  </el-form-item>
  <el-form-item label="状态 0:关闭 1:开放" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 0:关闭 1:开放"></el-input>
  </el-form-item>
  </el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useYogaSpaceApi, useYogaSpaceSubmitApi } from '@/api/yoga/space'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	capacity: '',
	status: ''})

const init = (id?: number) => {
	if (id) {
		getSpace(id)
	}
}

const getSpace = (id: number) => {
	useYogaSpaceApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	capacity: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaSpaceSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
