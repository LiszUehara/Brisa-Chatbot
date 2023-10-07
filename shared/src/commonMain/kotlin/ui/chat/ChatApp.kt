package ui.chat

import ChatColors
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.LocalTextStyle
import androidx.compose.material.MaterialTheme
import androidx.compose.material.ProvideTextStyle
import androidx.compose.material.Scaffold
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.sp
import dev.icerock.moko.mvvm.compose.getViewModel
import dev.icerock.moko.mvvm.compose.viewModelFactory
import dev.icerock.moko.mvvm.livedata.compose.observeAsState
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import org.jetbrains.compose.resources.ExperimentalResourceApi
import org.jetbrains.compose.resources.painterResource
import timestampMs
import view.MainViewModel

val myUser = User("Me", picture = null)
val botUser = User("Serafin", picture = "SeraFin.jpg")

val botMessages = listOf(
    "Opa tudo bem? Sou a Inteligência Artificial da SEFIN, como posso ajuda-lo?",
)


@Composable
fun ChatAppWithScaffold(displayTextField: Boolean = true) {
    Theme {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("The Composers Chat") },
                    backgroundColor = MaterialTheme.colors.background,
                )
            }) {
        }
    }
}

@OptIn(ExperimentalResourceApi::class)
@Composable
fun ChatApp(displayTextField: Boolean = true) {
    val viewModel : MainViewModel = getViewModel(Unit, viewModelFactory{ MainViewModel() })

    val data = viewModel.botResponse.observeAsState()

    val store = CoroutineScope(SupervisorJob()).createStore()
    val state by store.stateFlow.collectAsState()
    Theme {
        Surface {
            Box(modifier = Modifier.fillMaxSize()) {
                Image(painterResource("background.jpg"), null, contentScale = ContentScale.Crop)
                Column(
                    modifier = Modifier.fillMaxSize()
                ) {
                    Box(Modifier.weight(1f)) {
                        Messages(state.messages)
                    }
                    if (displayTextField) {
                        LaunchedEffect(Unit){
                            viewModel.getData()
                            store.state.messages.last()
                        }
                        SendMessage { text ->
                            store.send(
                                Action.SendMessage(
                                    Message(myUser, timeMs = timestampMs(), text)
                                )
                            )
                        }
                    }
                }
            }
        }
    }
    LaunchedEffect(Unit) {
//        var lastFriend = friends.random()
//        var lastMessage = friendMessages.random()
//        while (true) {
//            val thisFriend = friends.random()
//            val thisMessage = friendMessages.random()
//            if(thisFriend == lastFriend) continue
//            if(thisMessage == lastMessage) continue
//            lastFriend = thisFriend
//            lastMessage = thisMessage
           delay(1000)
            store.send(
                Action.SendMessage(
                    message = Message(
                        user = botUser,
                        timeMs = timestampMs(),
//                        text = botMessages.random()
                        text = data.value
                    )
                )
            )
    }
}

@Composable
fun Theme(content: @Composable () -> Unit) {
    MaterialTheme(
        colors = lightColors(
            surface = Color(ChatColors.SURFACE),
            background = Color(ChatColors.TOP_GRADIENT.last()),
        ),
    ) {
        ProvideTextStyle(LocalTextStyle.current.copy(letterSpacing = 0.sp)) {
            content()
        }
    }
}
