const ConvertApi =  require('convertapi-js')
let convertApi = ConvertApi.auth('DpHcMRRXg49vUJDQ')
let params = convertApi.createParams()
params.add('File', elFileInput.files[0]);
params.add('FileName', 'test');
params.add('ImageHeight', '2160');
params.add('ImageWidth', '3840');
let result = convertApi.convert('pptx', 'png', params)