import service from '@/utils/request'

export const useYogaSpaceApi = (id: number) => {
	return service.get('/yoga/space/' + id)
}

export const useYogaSpaceSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/space', dataForm)
	} else {
		return service.post('/yoga/space', dataForm)
	}
}