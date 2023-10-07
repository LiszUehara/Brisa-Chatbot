package ui

import MainColors
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.Scaffold
import androidx.compose.material.ScaffoldState
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Menu
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cafe.adriel.voyager.navigator.Navigator
import cafe.adriel.voyager.navigator.tab.LocalTabNavigator
import cafe.adriel.voyager.navigator.tab.Tab
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import ui.chat.createStore
import ui.home.HomeScreen

@Composable
fun RowScope.TabNavigationItem(tab: Tab) {
    val tabNavigator = LocalTabNavigator.current

    BottomNavigationItem(
        selected = tabNavigator.current.key == tab.key,
        onClick = { tabNavigator.current = tab },
        icon = { Icon(painter = tab.options.icon!!, contentDescription = tab.options.title) },
        modifier = Modifier.background(Color(0xFF2c307e))
    )
}

@Composable
fun App(){
//    val store = CoroutineScope(SupervisorJob()).createStore()
    Scaffold (
        content = {
            Navigator(HomeScreen())
        }
    )
//        TabNavigator(HomeTab) {
//            val viewModel : MainViewModel = getViewModel(Unit, viewModelFactory{ MainViewModel() })
//            val teste = viewModel.bottomTab.observeAsState()
//
////            val bottomBarState = rememberSaveable { (mutableStateOf(true)) }
////            val topBarState = rememberSaveable { (mutableStateOf(true)) }
//
//            Scaffold(
//                content = {
//                    CurrentTab()
//                },
//                bottomBar = {
//                    AnimatedVisibility(
//                        visible = teste.value,
//                        enter = slideInVertically(initialOffsetY = { it }),
//                        exit = slideOutVertically(targetOffsetY = { it }),
//                        content = {
//                           BottomNavigation {
//                               TabNavigationItem(HomeTab)
//                               TabNavigationItem(ChatTab)
//                               TabNavigationItem(AboutTab)
//                           }
//                        }
//                    )
//                }
//            )
//        }
}

@Composable
fun TopBar(
    state: ScaffoldState,
    scope :CoroutineScope,
    title: String,
    backgroundColor: Color = Color.Transparent,
    contentColor: Color = Color.White,
    canPop: Boolean = false,
    onNavigationBackClick: () -> Unit = {},
    appBarActions: @Composable RowScope.() -> Unit = {}
) {

//    val isAndroid = when (currentPlatform) {
//        Platform.IOS -> false
//        Platform.ANDROID -> true
//        Platform.DESKTOP -> false
//    }

    TopAppBar(
        modifier = Modifier
            .clip(RoundedCornerShape(bottomStart = 8.dp, bottomEnd = 8.dp)),
        backgroundColor = Color(MainColors.blue),
        contentColor = contentColor,
//            modifier = Modifier.background(Color(0xFF2c307e)),

        title = {
            Text(
                modifier = Modifier.fillMaxWidth(),
                text = title,
                fontSize = 20.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                fontWeight = FontWeight.Normal,
                textAlign = TextAlign.Start
            )
        },
        navigationIcon = {
            if (canPop) {
                IconButton(
                    modifier = Modifier
                        .padding(start = 5.dp)
                        .size(width = 30.dp, height = 40.dp),
                    onClick = { onNavigationBackClick() }
                ) {
                    Icon(
                        imageVector = if (true)
                            Icons.Filled.ArrowBack
                        else
                            Icons.Filled.ArrowDropDown,
                        contentDescription = null
                    )
                }
            } else {
                IconButton(
                    onClick = { scope.launch { state.drawerState.open() } }
                ) {
                    Icon(Icons.Filled.Menu, "")
                }
            }

        },
            actions = {
                IconButton(
                    onClick = {
                    }
                ) {
                    Icon(Icons.Filled.Info,"")
                }
            },
    )

}
