package ui.login

import androidx.compose.runtime.Composable
import dev.icerock.moko.mvvm.compose.getViewModel
import dev.icerock.moko.mvvm.compose.viewModelFactory
import dev.icerock.moko.mvvm.livedata.compose.observeAsState
import view.MainViewModel

@Composable
fun Login(){
    val viewModel : MainViewModel = getViewModel(Unit, viewModelFactory{ MainViewModel() })
//    val teste = viewModel.bottomTab.observeAsState()





}