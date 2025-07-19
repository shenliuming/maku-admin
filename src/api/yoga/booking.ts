import service from '@/utils/request'

export const useYogaBookingApi = (id: number) => {
	return service.get('/yoga/booking/' + id)
}

export const useYogaBookingSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/booking', dataForm)
	} else {
		return service.post('/yoga/booking', dataForm)
	}
}