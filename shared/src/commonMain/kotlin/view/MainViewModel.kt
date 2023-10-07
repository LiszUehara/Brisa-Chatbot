package view

import dev.icerock.moko.mvvm.livedata.LiveData
import dev.icerock.moko.mvvm.livedata.MutableLiveData
import dev.icerock.moko.mvvm.viewmodel.ViewModel
import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText


class MainViewModel : ViewModel() {
    private val _bottomTab: MutableLiveData<Boolean> = MutableLiveData(true)
    val bottomTab: MutableLiveData<Boolean> = _bottomTab

    val botResponse : MutableLiveData<String> =  MutableLiveData("Olá sou a Inteligência Artificial da Secretaria de Finanças do Juazeiro do Norte | SEFIN, como posso ajudar?")

    val client = HttpClient()

    suspend fun getData(){

        val response = client.get("https://ktor.io/docs/")
        botResponse.value = response.bodyAsText()
    }
}