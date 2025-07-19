<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="图片标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="图片标题"></el-input>
  </el-form-item>
  <el-form-item label="图片URL" prop="imageUrl">
      <el-input v-model="dataForm.imageUrl" placeholder="图片URL"></el-input>
  </el-form-item>
  <el-form-item label="排序值（越大越靠前）" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序值（越大越靠前）"></el-input>
  </el-form-item>
  <el-form-item label="状态 0:停用 1:启用" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 0:停用 1:启用"></el-input>
  </el-form-item>
  <el-form-item label="点击跳转链接" prop="clickLink">
      <el-input v-model="dataForm.clickLink" placeholder="点击跳转链接"></el-input>
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
import { useYogaBannerApi, useYogaBannerSubmitApi } from '@/api/yoga/banner'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	title: '',
	imageUrl: '',
	sort: '',
	status: '',
	clickLink: '',
	createTime: ''})

const init = (id?: number) => {
	if (id) {
		getBanner(id)
	}
}

const getBanner = (id: number) => {
	useYogaBannerApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	title: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	imageUrl: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	sort: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	clickLink: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaBannerSubmitApi(dataForm).then(() => {
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
