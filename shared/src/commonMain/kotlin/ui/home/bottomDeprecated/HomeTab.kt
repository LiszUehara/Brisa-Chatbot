package ui.home.bottomDeprecated

import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import cafe.adriel.voyager.navigator.Navigator
import cafe.adriel.voyager.navigator.tab.Tab
import cafe.adriel.voyager.navigator.tab.TabOptions
import cafe.adriel.voyager.transitions.SlideTransition
import ui.TopBar
import ui.drawerUtils.DrawerContent
import ui.home.ItemsScreen

object HomeTab :  Tab{
    @Composable
    override fun Content() {
        val state = rememberScaffoldState()
        val scope = rememberCoroutineScope()

    MaterialTheme{
        Navigator(
            screen = ItemsScreen
        ){navigator ->

            Scaffold(
                scaffoldState = state,
                drawerContent = {
                    //store kd?
//                   DrawerContent(navigator,scope,state)
                },
                topBar = { TopBar(
                    state,
                    scope,
                    title = navigator.lastItem.key,
                    canPop = navigator.canPop,
                    onNavigationBackClick = { navigator.pop() })
                },
            ) {
                SlideTransition(navigator)
            }
        }
    }
    }

    override val options: TabOptions
        @Composable
        get() {

            val title = "Home"

            val icon = rememberVectorPainter(Icons.Default.Home)
            return remember{
                TabOptions(
                    index = 0u,
                    title = title,
                    icon = icon
                )
            }
        }
}