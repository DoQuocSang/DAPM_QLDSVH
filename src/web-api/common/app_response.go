package common

type successRes struct {
	Data   interface{} `json:"Data"`
	Paging interface{} `json:"Paging,omitempty"`
	Filter interface{} `json:"Filter,omitempty"`
}

func NewSuccessResponse(data, paging, filter interface{}) *successRes {
	return &successRes{Data: data, Paging: paging, Filter: filter}
}

func SimpleSuccessResponse(data interface{}) *successRes {
	return NewSuccessResponse(data, nil, nil)
}
