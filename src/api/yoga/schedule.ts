import service from '@/utils/request'

export const useYogaScheduleApi = (id: number) => {
	return service.get('/yoga/schedule/' + id)
}

export const useYogaScheduleSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/schedule', dataForm)
	} else {
		return service.post('/yoga/schedule', dataForm)
	}
}