import service from '@/utils/request'

export const useYogaTeacherApi = (id: number) => {
	return service.get('/yoga/teacher/' + id)
}

export const useYogaTeacherSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/teacher', dataForm)
	} else {
		return service.post('/yoga/teacher', dataForm)
	}
}