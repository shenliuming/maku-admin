import service from '@/utils/request'

export const useYogaCourseApi = (id: number) => {
	return service.get('/yoga/course/' + id)
}

export const useYogaCourseSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/course', dataForm)
	} else {
		return service.post('/yoga/course', dataForm)
	}
}