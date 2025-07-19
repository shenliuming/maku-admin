import service from '@/utils/request'

export const useYogaBannerApi = (id: number) => {
	return service.get('/yoga/banner/' + id)
}

export const useYogaBannerSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/yoga/banner', dataForm)
	} else {
		return service.post('/yoga/banner', dataForm)
	}
}