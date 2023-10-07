package ui.home.bottomDeprecated

import ui.chat.ChatApp
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import cafe.adriel.voyager.navigator.tab.Tab
import cafe.adriel.voyager.navigator.tab.TabOptions
import dev.icerock.moko.mvvm.compose.getViewModel
import dev.icerock.moko.mvvm.compose.viewModelFactory
import view.MainViewModel

object ChatTab :  Tab{
    @Composable
    override fun Content() {
        val viewModel : MainViewModel = getViewModel(Unit, viewModelFactory{ MainViewModel() })
        viewModel.bottomTab.value = false
//        ChatApp(store = store)
    }

    override val options: TabOptions
        @Composable
        get() {
            val title = "Chat"
            val icon = rememberVectorPainter(Icons.Default.MailOutline)
            return remember{
                TabOptions(
                    index = 1u,
                    title = title,
                    icon = icon,
                )
            }
        }
}